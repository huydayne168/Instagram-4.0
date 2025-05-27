async function readFileAsDataURL(file: File) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => resolve(fileReader.result);
    });

    // console.log(result_base64); // aGV5IHRoZXJl...

    return result_base64;
}

export default readFileAsDataURL;
