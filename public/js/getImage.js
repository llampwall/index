// injecting this javascript into the register view 
// so that the image upload can be done in the background

// get the image from the input
var input = document.querySelector("input[type=file]");
input.addEventListener('change', uploadIt);

var img_name = document.getElementById("img_name")

var submit_btn = document.querySelector('button')


async function uploadIt() {
    var file = input.files[0]
    var filename = file.name
    var type = encodeURIComponent(file.type)
    var getStr = '/posts/url/' + filename + '/' + type
    // console.log(getStr)

    // get the signed url
    submit_btn.innerText = 'uploading image'
    submit_btn.disabled = true
    axios.get(getStr)
    .then (function(response) {   
        signedUrl = response.data
        console.log('signed url: ' + signedUrl)

        // upload file to s3
        var options = {
            headers: {
              'Content-Type': file.type
            }
          }
          axios.put(signedUrl, file, options)
          .then(function(response) {
            console.log(response)
            img_name.value = filename
            console.log(document.getElementById("img_name").value)
            submit_btn.innerText = '[register]'
            submit_btn.disabled = false
          })
    })

    
}