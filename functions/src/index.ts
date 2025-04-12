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
// import * as admin from "firebase-admin"
// import * as functions from "firebase-functions"

// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest( ( request, response ) => {
//   logger.info( "Hello logs!", { structuredData: true } )
//   response.send( "Hello from Firebase!" )
// } )

interface RemoveMessageData {
  messageId: string;
}
export const removeMessage = onCall<RemoveMessageData>( ( data, context ) => {
  const {messageId} = data.data;
  return {success: `ok: ${ messageId }`};
} );
