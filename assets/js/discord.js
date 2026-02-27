document.addEventListener('DOMContentLoaded', () => {
    const avatarFrame = document.getElementById('avatar-frame');

    const frameUrl =
        "https://cdn.discordapp.com/avatar-decoration-presets/a_a87e3efa4de2956331831681231ce63b.png";

    avatarFrame.src = frameUrl;
    avatarFrame.style.display = 'block';
});
