document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const item = {
        hotel: params.get('hotel'),
        food: params.get('food'),
        phone: params.get('phone'),
        address: params.get('address'),
        email: params.get('email'),
        datetime: params.get('datetime')
    };

    if (item.hotel) {
        document.getElementById('itemDetails').innerHTML = `
            <p>Hotel: ${item.hotel}</p>
            <p>Food: ${item.food}</p>
            <p>Phone: ${item.phone}</p>
            <p>Address: ${item.address}</p>
            <p>Email: ${item.email}</p>
            <p>Datetime: ${item.datetime}</p>
        `;
    }

    document.getElementById('downloadPdfBtn').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(`Hotel: ${item.hotel}`, 10, 10);
        doc.text(`Food: ${item.food}`, 10, 20);
        doc.text(`Phone: ${item.phone}`, 10, 30);
        doc.text(`Address: ${item.address}`, 10, 40);
        doc.text(`Email: ${item.email}`, 10, 50);
        doc.text(`Datetime: ${item.datetime}`, 10, 60);
        doc.save('item-details.pdf');
    });
});
