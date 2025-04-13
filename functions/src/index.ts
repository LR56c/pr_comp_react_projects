/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
// import * as logger       from "firebase-functions/logger"
import * as admin from "firebase-admin";
// import * as functions from "firebase-functions"

// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
interface RemoveMessageData {
  id: string;
  name: string;
}

export const removeMessage = onCall<RemoveMessageData>(
  async ( data, context ) => {
    try {
      const {id, name} = data.data;
      await admin.firestore()
        .collection( "projects" )
        .doc( `${ name }-${ id }` )
        .delete();
      return {status: "ok"};
    } catch ( e ) {
      return {status: "error"};
    }
  } );
