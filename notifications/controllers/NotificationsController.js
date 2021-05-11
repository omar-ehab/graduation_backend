const fb_admin = require('firebase-admin');
const Notification = require('../models/Notification');
const notificationModel = new Notification();

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
}


fb_admin.initializeApp({
    credential: fb_admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const database = fb_admin.database();
const notificationRef = database.ref('/notifications');

const getNotificationTypes = async (req, res) => {
    const rawNotifications = notificationModel.getAll();
    const notifications = Object.keys(rawNotifications);
    res.json({
        success: true,
        notifications
    });
}


//in app notification POST
const createNotification = async (req, res) => {
    try {
        const { notification_type, student_id } = req.params;
        let notification = {};

        notification = notificationModel.get(notification_type);

        const notification_id = notificationRef.push().key;

        notificationRef.child(notification_id).set({
            student_id,
            is_read: false,
            notification,
        });
        res.json({success: true, message: 'Notification Created Successfully'});

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Something Went Wrong!'});
    }
}




//sends push notification to user
const notifyUser = async (req, res) => {

    const {notification_type, fcm_token} = req.params;
    let notification_body = {};

    notification_body.notification = notificationModel.get(notification_type);
    notification_body.registration_id = fcm_token;

    try {
        await notificationModel.pushNoitification(notification_body);
        res.json({ success: true, message: 'Notification Sent Successfully'});
    } catch(error) {
        if(error.response){
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({success: false, message: error.message});
        }
    }
}

//sends notification to all users ONLY PROMO CODE NOTIFICATION !!!!!!
const sendToAll = async (req, res) => {
    // get the type of notification from parameters
    const {notification_type} = req.params;
    let notification_body = {}

    // token from all devices from parameters
    // al tokens de htgeli ezayyy!!
    // mn el students service el mfrod n3ml hna request ngeb kol el tokens xD
    const fcm_tokens = [];
    if (notification_type == "promoCode_notification") {
        notification_body = {
            notification: notificationModel.get(notification_type),
            registration_id: fcm_tokens
        }
    } else {
        res.status(400).json({ success: false, message: 'Please Select valid notification type'});
    }

    try {
        await notificationModel.pushNoitification(notification_body);
        res.json({ success: true, message: 'Notification Sent Successfully'});
    } catch(error) {
        if(error.response){
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({success: false, message: error.message});
        }
    }
}

module.exports = {
    getNotificationTypes,
    createNotification,
    notifyUser,
    sendToAll
}