const attendees = [];

const ageInput = document.getElementById('age');
const ageOutput = document.getElementById('ageOutput');

ageInput.addEventListener('input', () => {
    ageOutput.textContent = ageInput.value;
});

const id = document.getElementById('id');

// Validador de formato de archivo cargado.
id.addEventListener('change', function () {
    const file = id.files[0];
  
    if (file) {
      const fileName = file.name;
      const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  
      if (extension !== '.pdf' && extension !== '.jpeg' && extension !== '.jpg') {
        alert(`Seleccionaste un archivo con extensión "${extension.toUpperCase()}". Por favor, selecciona un archivo ".PDF", ".JPEG" o ".JPG."`);
        id.value = '';
        return;
      } 
    }
  });

document.getElementById('eventForm'). addEventListener('submit', (event) => {

    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const persOrProf = document.querySelector('input[name="persOrProf"]:checked');
    const selectedInterests  = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(input => input.value);
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const allInputs = document.querySelectorAll('input');
    ageOutput.textContent = age.value;
    
    // Validador de campos obligatorios.
    if (!firstName || !lastName || !age || !email || !phoneNumber || !persOrProf || selectedInterests.length === 0 || !eventDate || !eventTime) {
        alert('Existen campos obligatorios que no has llenado (marcados con asterisco). Por favor, complétalos.');
        return;
      };

    // Validador de edad mínima.
    if (parseInt(age, 10) < 18) {
        alert('Lo sentimos, este evento es solo para mayores de edad.');
        return;
    };

    // Validador de tipo de dato en número telefónico y dígitos.
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert('Debes agregar un número telefónico válido.');
        return;
    };

    // Validador de horario.
    if (parseInt(eventTime.replace(':', '')) < 1100 || parseInt(eventTime.replace(':', '')) > 1800) {
        alert('Debes seleccionar un horario entre las 11:00 a.m. y 06:00 p.m.');
        return;
    };
    
    const newAttendee = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        sentId: `${id.value !== '' ? 'true' : 'false'}`,
        email: email,
        phoneNumber: phoneNumber,
        persOrProf: persOrProf.value,
        interests: selectedInterests,
        eventDate: eventDate,
        eventTime: eventTime 
    };
    
    attendees.push(newAttendee);
    console.log(attendees);
    alert('Registro exitoso. ¡Gracias por registrarte!');

    allInputs.forEach(input => {
        if (input.type !== 'radio' && input.type !== 'checkbox' && input.type !== 'submit' && input.type !== 'range') {
            input.value = '';
        } else if (input.type === 'range' ) {
            input.value = '18';
            ageOutput.textContent = '18';
        } else {
            input.checked = false;
        }
    });
});