import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzH1dneA5yvBS1yplkV5J5Uk36OScN3PY",
    authDomain: "zahir-khan-cd8d1.firebaseapp.com",
    databaseURL: "https://zahir-khan-cd8d1-default-rtdb.firebaseio.com",
    projectId: "zahir-khan-cd8d1",
    storageBucket: "zahir-khan-cd8d1.appspot.com",
    messagingSenderId: "882366704194",
    appId: "1:882366704194:web:a5a18eb68681059fd49bdb",
    measurementId: "G-6W0SP694ZB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const foodListRef = ref(database, 'zahir_khan/donationForm');
    const tableBody = document.getElementById('foodList');

    onValue(foodListRef, (snapshot) => { 
        tableBody.innerHTML = ''; 
        const currentDate = new Date();
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const itemDate = new Date(item.datetime);

            if (itemDate <= currentDate) {
                const itemRef = ref(database, `zahir_khan/donationForm/${childSnapshot.key}`);
                remove(itemRef).catch(error => {
                    console.error('Error removing item:', error);
                });
            } else {
                const row = document.createElement('tr');
                row.dataset.id = childSnapshot.key;
                row.innerHTML = `
                    <td>${item.hotel}</td>
                    <td>${item.food}</td>
                    <td>${item.phone}</td>
                    <td>${item.address}</td>
                    <td>${item.email}</td>
                    <td>${item.datetime}</td>
                    <td><button class="select-btn" data-id="${childSnapshot.key}">Select</button></td>
                `;
                tableBody.appendChild(row);
            }
        });

        document.querySelectorAll('.select-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                fetchAndRemoveItem(id);
            });
        });
    });

    async function fetchAndRemoveItem(id) {
        const itemRef = ref(database, `zahir_khan/donationForm/${id}`);
        try {
            const snapshot = await get(itemRef);
            const item = snapshot.val();
            if (item) {
                const queryString = new URLSearchParams(item).toString();
                window.location.href = `details.html?${queryString}`;
                await remove(itemRef);
            } else {
                alert('Item not found.');
            }
        } catch (error) {
            console.error('Error fetching or removing item:', error);
        }
    }

    function searchTable(columnIndex, query) {
        const rows = tableBody.getElementsByTagName('tr');
        Array.from(rows).forEach(row => {
            const cell = row.getElementsByTagName('td')[columnIndex];
            if (cell) {
                const cellText = cell.textContent.toLowerCase();
                row.style.display = cellText.includes(query.toLowerCase()) ? '' : 'none';
            }
        });
    }

    document.getElementById('hotelSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('hotelSearch').value;
        searchTable(0, query);
    });

    document.getElementById('foodSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('foodSearch').value;
        searchTable(1, query);
    });

    document.getElementById('phoneSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('phoneSearch').value;
        searchTable(2, query);
    });

    document.getElementById('addressSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('addressSearch').value;
        searchTable(3, query);
    });

    document.getElementById('emailSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('emailSearch').value;
        searchTable(4, query);
    });

    document.getElementById('datetimeSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('datetimeSearch').value;
        searchTable(5, query);
    });
});
