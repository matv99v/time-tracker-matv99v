const retIt = {};

retIt.isPermissionGranted = () => {
    return Notification.permission === 'granted';
};

retIt.isSupported = () => {
    return !!Notification;
};

retIt.requestPermission = () => {
    Notification.requestPermission((premission) => {
        console.log(premission);
    });
};

retIt.spawnNotification = () => {
    const notification = new Notification('Timer reminder');
};


module.exports = retIt;
