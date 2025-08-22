export default function decorate(block) {
  let orderStatus = [];
  const orderStatusApiData = `
    {
  "orders": [
    {
      "orderId": "ORD-1001",
      "productName": "Foresight® Carrier Screen",
      "orderDate": "2025-08-05",
      "status": "Completed – View Results",
      "trackingNumber": "TRACK12345",
      "sampleReceivedDate": "2025-08-10",
      "resultsAvailableDate": "2025-08-25",
      "notes": "Returns complete, report available in patient portal"
    },
    {
      "orderId": "ORD-1002",
      "productName": "Prequel® Prenatal Screen",
      "orderDate": "2025-08-15",
      "status": "Processing",
      "trackingNumber": "TRACK67890",
      "expectedSampleArrival": "2025-08-20",
      "expectedResultsDate": "2025-08-29",
      "notes": "Blood draw scheduled via mobile phlebotomy"
    },
    {
      "orderId": "ORD-1003",
      "productName": "MyRisk® Hereditary Cancer Test",
      "orderDate": "2025-08-20",
      "status": "Pending",
      "trackingNumber": null,
      "expectedShipmentDate": "2025-08-22",
      "notes": "Doctor needs to sign off order"
    }
  ]
}`;
  const orderStatusJSON = JSON.parse(orderStatusApiData);
  console.log(orderStatusJSON);
  const orderStatusMarkup = `<h1>Order Status</h1>`;
  block.innerHTML = "";
  block.appendChild(orderStatusMarkup);
}
