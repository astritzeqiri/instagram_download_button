var images = [];
var hasNew = true;
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "setImages":
            case "addImages":
                images = message.images;
                hasNew = true;
                break;
            case "getImages":
                if (hasNew) {
                    sendResponse(images);
                    hasNew = false;
                }
                break;
            case "getImagesFirst":
                hasNew = true;
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);
