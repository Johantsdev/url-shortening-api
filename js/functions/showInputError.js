const form = document.querySelector('form');
const missingLinkMsg = document.querySelector('.missing-link-message');

function showInputError(bool) {
    switch (bool) {
        case true: 
            form.classList.add('missing-link');
            missingLinkMsg.style.display = 'block';
            break;
        case false:
            form.classList.remove('missing-link');
            missingLinkMsg.style.display = 'none';
            break;
    }
}

export default showInputError;