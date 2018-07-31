const like = document.getElementById('likes')
const button = document.getElementsByClassName('button')[0]
const inputField = document.getElementsByTagName('textarea')[0]


// If PUBLISH button was pressed
button.addEventListener('click', () => {
  const data = inputField.value
  if (!data) return
  inputField.value = ''

  fetch('/submit', {
    method: "POST",
    headers: {"Content-Type": "application/json; charset=utf-8"},
    body: JSON.stringify({data: data})
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } throw new Error('Woops')
  }, networkError => {
    console.log(networkError.message)
  }).then(jsonResponse => {console.log(jsonResponse)})
  document.location.reload();
})
