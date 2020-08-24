let webPush = require('web-push');
const vapidKeys ={"publicKey":"BEs8u6-gBkmwHMl4M0UaqUTmPDAFqly7q-EMbx20lAF7lb_3CP56IlrwHlQ1d-KFVHcJe_ibuxuOR39q_yDaQi8",
"privateKey":"BqFLPCCd2LjGQSMs7TavGBheySt-P1Em3SvHz2WJAMs"}
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fwSRue0JDdk:APA91bHf2eBmAE7DjlBgCU_M86Vo6D4qHJG_rvLmJrtzrYV7-fKQ1coTvgEzQyf3XH8efLpbJ7MOcWDQtAeXUl5gt0QzcqjF9rX_FvIzaHS426p9R67da2xX_qnZKsSgdHfJWXlMmiVJ",
    "keys": {
        "p256dh": "BKCKpsJbQXJNtVw0qflhvdXhDQOl/e+nT+JCIc58GnODdgqYKddbCxJJCY64eyLIHbNwae+8O/ayb6A8sm6DZHY=",
        "auth": "+PV/qlfz8AORjXIdYunYPg==" 
    }
};
let payload = 'Hello , Submission Anda Sedang di Review-';
let options = {
    gcmAPIKey: '952877957561',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);