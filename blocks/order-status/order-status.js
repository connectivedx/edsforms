export default function decorate(block) {
  let orderStatus = [];
  const orderStatusApiData = `{
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
  const orderTemplate = `<div id="order-{{orderId}}">
      <h2>{{productName}}</h2>
      <p>Order Date: {{orderDate}}</p>
      <p>Status: {{status}}</p>
      <p>Tracking Number: {{trackingNumber}}</p>
      <p>Sample Received Date: {{sampleReceivedDate}}</p>
      <p>Results Available Date: {{resultsAvailableDate}}</p>
      <p>Notes: {{notes}}</p>
    </div>`;

  function renderOrderStatus(order) {
    const orderHTML = orderTemplate
      .replace(/{{orderId}}/g, order.orderId)
      .replace(/{{productName}}/g, order.productName)
      .replace(/{{orderDate}}/g, order.orderDate)
      .replace(/{{status}}/g, order.status)
      .replace(/{{trackingNumber}}/g, order.trackingNumber || "N/A")
      .replace(/{{sampleReceivedDate}}/g, order.sampleReceivedDate || "N/A")
      .replace(/{{resultsAvailableDate}}/g, order.resultsAvailableDate || "N/A")
      .replace(/{{notes}}/g, order.notes || "N/A");
    return orderHTML;
  }

  const orderStatusJSON = JSON.parse(orderStatusApiData);
  console.log(orderStatusJSON);
  const orderStatusMarkup = document.createElement("h1");
  orderStatusMarkup.textContent = "Order Status";
  block.innerHTML = "";
  block.append(orderStatusMarkup);
}
