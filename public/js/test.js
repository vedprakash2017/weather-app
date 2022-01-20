console.log('hello, client side js here')

const formClick = document.querySelector('form')
const address = document.querySelector('input')
const given = document.querySelector('.ans')
const given1 = document.querySelector('.ans-1')


formClick.addEventListener('submit' , (e)=>{
    e.preventDefault()

    console.log(address.value)
    given.textContent = 'Loading....  '
    given1.textContent = ''
    
    
    if(address.value.length <1)
    {
        given.textContent = 'Unable to Locate! Try another search'
    }
    else
    fetch('/weather?address='+decodeURIComponent(address.value)).then( (res) => {
        res.json().then((data) => {
            if(data.error)
            given.textContent = data.error
            else
            given.textContent = data.location 
            given1.textContent = 'Forecast: '+ data.forecast+ '  || Temperature: '+ data.temperature;
        })
    })
})