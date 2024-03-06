import { createUploadthing} from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes

export const ourFileRouter = {

// Define as many FileRoutes as you like, each with a unique routeSlug

imageUploader: f({ image: { maxFileSize: "4MB" } })

.onUploadComplete(async ({ file }) => {

console.log("file url", file.url);

// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback

return { message:'Image Upload Complete' };

}),

pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

.onUploadComplete(async ({ file }) => {

console.log("file url", file.url);

return { message:'Pdf Upload Complete' };

}),

videoUploader: f({ video: { maxFileSize: "4MB" } })

.onUploadComplete(async ({ file }) => {

console.log("file url", file.url);

return { message:'Video Upload Complete' };

}),

} ;