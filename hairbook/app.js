async function loadServices() {
  const servicesList = document.getElementById("servicesList");
  const serviceSelect = document.getElementById("service_id");

  if (!servicesList) return;

  try {
    const response = await fetch("php/get_services.php");
    const services = await response.json();

    let html = "";
    let options = '<option value="">Odaberi uslugu</option>';

    services.forEach(service => {
      html += `
        <div class="service-card">
          <h3>${service.service_name}</h3>
          <p>${service.description}</p>
          <p><strong>Cijena:</strong> ${service.price} KM</p>
          <p><strong>Trajanje:</strong> ${service.duration} min</p>
        </div>
      `;

      options += `<option value="${service.id}">${service.service_name}</option>`;
    });

    servicesList.innerHTML = html;

    if (serviceSelect) {
      serviceSelect.innerHTML = options;
    }
  } catch (error) {
    servicesList.innerHTML = "<p>Greška pri učitavanju usluga.</p>";
  }
}

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!window.currentUserId) {
      alert("Sačekaj da se učita korisnik...");
      return;
    }

    const service_id = document.getElementById("service_id").value;
    const appointment_date = document.getElementById("appointment_date").value;
    const appointment_time = document.getElementById("appointment_time").value;

    const formData = new URLSearchParams();
    formData.append("user_id", window.currentUserId);
    formData.append("service_id", service_id);
    formData.append("appointment_date", appointment_date);
    formData.append("appointment_time", appointment_time);

    try {
      const response = await fetch("php/add_appointment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });

      const result = await response.text();
      alert(result);

      appointmentForm.reset();
      loadAppointments();
    } catch (error) {
      alert("Greška pri rezervaciji.");
    }
  });
}

async function loadAppointments() {
  const list = document.getElementById("appointmentsList");
  if (!list) return;

  if (!window.currentUserId) {
    setTimeout(loadAppointments, 500);
    return;
  }

  try {
    const response = await fetch("php/get_appointments.php?user_id=" + window.currentUserId);
    const data = await response.json();

    if (data.length === 0) {
      list.innerHTML = "<p>Nema rezervacija.</p>";
      return;
    }

    let html = "";

    data.forEach(app => {
      html += `
        <div class="service-card">
          <h3>${app.service_name}</h3>
          <p><strong>Datum:</strong> ${app.appointment_date}</p>
          <p><strong>Vrijeme:</strong> ${app.appointment_time}</p>
          <p><strong>Status:</strong> ${app.status}</p>
          <button onclick="showEditForm(${app.id}, '${app.appointment_date}', '${app.appointment_time}')" class="btn">Izmijeni</button>
          <button onclick="deleteAppointment(${app.id})" class="btn">Obriši</button>
        </div>
      `;
    });

    list.innerHTML = html;
  } catch (error) {
    list.innerHTML = "<p>Greška pri učitavanju termina.</p>";
  }
}

async function deleteAppointment(id) {
  if (!confirm("Obrisati termin?")) return;

  const formData = new URLSearchParams();
  formData.append("id", id);

  try {
    const response = await fetch("php/delete_appointment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    alert(await response.text());
    loadAppointments();
  } catch (error) {
    alert("Greška pri brisanju.");
  }
}

function showEditForm(id, oldDate, oldTime) {
  const newDate = prompt("Unesi novi datum (YYYY-MM-DD):", oldDate);
  if (!newDate) return;

  const newTime = prompt("Unesi novo vrijeme (HH:MM:SS ili HH:MM):", oldTime);
  if (!newTime) return;

  updateAppointment(id, newDate, newTime);
}

async function updateAppointment(id, appointment_date, appointment_time) {
  const formData = new URLSearchParams();
  formData.append("id", id);
  formData.append("appointment_date", appointment_date);
  formData.append("appointment_time", appointment_time);

  try {
    const response = await fetch("php/update_appointment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    alert(await response.text());
    loadAppointments();
  } catch (error) {
    alert("Greška pri izmjeni termina.");
  }
}

loadServices();
loadAppointments();