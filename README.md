# Optical Character Recognition.

> This is a full stack OCR application to retreive JSON format data from the Thai ID cards.

### Dependency.

> Makes use of the **Google Cloud Vision Api** for retreiving text from the images.

### Tech Stack.

1. Reactjs.
2. Mongoose-- Mongodb object modelling.
3. Mongodb as database.
4. Express server.
5. TailwindCss styling.

### Description.

The application takes an image from the user, as an input. The image must follow the format, similar to that of a **Thai** Id card, images other than that may give unpredictable outputs.
Results are shown in the JSON format, along with the number of success/failure operations happening.

## Setting up the project.

1. cd **frontend**
1. run the command `npm install`
1. In the frontend folder add **.env** file in the following format---

```
VITE_PRODUCT_ID = <your_google_cloud_project_id_comes_here>
```

5. In the frontend folder, **src/utils** go to **origin.js** change origin to `http://localhost:3000`
6. run the command `npm run dev`
7. cd **backend**
8. run the command `npm install`
9. In the **backend** folder add a secret file of the json format obtained from google cloud vision api, which contains secret public/private key in json.
10. In the backend folder add **.env** file in the following format---

```
PROJECT_ID = <your_google_cloud_project_id_comes_here>
SECRET_KEY_PATH = <secret_file_name>.json
uri =  <mongodb_uri_connect_comes_here>
```

11. run the command `npm run dev`

# Live Working

> https://ocr-nine-sable.vercel.app/
