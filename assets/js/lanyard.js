document.addEventListener('DOMContentLoaded', () => {
  const userId = '908708824284815400'; // replace your discord id here
  const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

  const avatar = document.getElementById('discord-avatar');
  const username = document.getElementById('discord-username');
  const statusDot = document.getElementById('discord-status-dot');
  const statusText = document.getElementById('discord-status-text');
  const activityInfo = document.getElementById('discord-activity-info');
  const noActivity = document.getElementById('discord-no-activity');
  const activityName = document.getElementById('discord-activity-name');
  const activityDetails = document.getElementById('discord-activity-details');
  const activityState = document.getElementById('discord-activity-state');
  const albumArt = document.getElementById('discord-album-art');

  async function updateDiscordStatus() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data?.success) return;

      const discord = data.data;

      // Avatar (fallback if null)
      const avatarHash = discord?.discord_user?.avatar;
      const discriminator = Number(discord?.discord_user?.discriminator || 0);
      const fallbackIndex = Number.isFinite(discriminator) ? (discriminator % 5) : 0;

      const avatarUrl = avatarHash
        ? `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${fallbackIndex}.png`;

      avatar.src = avatarUrl;

      // Username
      username.textContent = discord?.discord_user?.username || 'Unknown';

      // Status
      const status = discord?.discord_status || 'offline';
      statusDot.className = `status-dot status-${status}`;

      statusText.textContent =
        status === 'dnd'
          ? 'Do Not Disturb'
          : status.charAt(0).toUpperCase() + status.slice(1);

      // Activity: ưu tiên Playing (0) hoặc Listening/Spotify (2)
      const activity =
        discord.activities?.find(a => a.type === 0) ||
        discord.activities?.find(a => a.type === 2);

      if (activity) {
        activityInfo.classList.remove('hidden');
        noActivity.classList.add('hidden');

        activityName.textContent = activity.name || '';
        activityDetails.textContent = activity.details || '';
        activityState.textContent = activity.state || '';

        if (activity.assets?.large_image) {
          const assetUrl = getAssetUrl(activity.assets.large_image, activity.application_id);
          albumArt.style.backgroundImage = `url('${assetUrl}')`;
        } else {
          albumArt.style.backgroundImage = '';
        }
      } else {
        activityInfo.classList.add('hidden');
        noActivity.classList.remove('hidden');
        albumArt.style.backgroundImage = '';
      }
    } catch (error) {
      console.error('Error fetching Discord status:', error);
    }
  }

  function getAssetUrl(asset, applicationId) {
    if (!asset) return '';
    if (asset.startsWith('mp:')) {
      return `https://media.discordapp.net/${asset.replace('mp:', '')}`;
    }
    if (!applicationId) return '';
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
  }

  updateDiscordStatus();
  setInterval(updateDiscordStatus, 10000);
});
