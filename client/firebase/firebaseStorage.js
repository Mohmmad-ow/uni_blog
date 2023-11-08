import app from "./firebaseSetup.js";
import { getStorage , ref} from "firebase/storage";

const storage = getStorage(app, "gs://reliable-strata-396910.appspot.com");

const storageRef = ref(storage);
export default storageRef;
