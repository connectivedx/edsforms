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
  const orderTemplate = `<div id="order-{{orderId}}" class="order">
      <h2>{{productName}}</h2>
      <p><span class="order-key">Order Date:</span> <span name="order-date">{{orderDate}}</span></p>
      <p><span class="order-key">Status:</span> <span name="order-status">{{status}}</span></p>
      <p><span class="order-key">Tracking Number:</span> <span name="order-tracking">{{trackingNumber}}</span></p>
      <p><span class="order-key">Sample Received Date:</span> <span name="order-sample-received">{{sampleReceivedDate}}</span></p>
      <p><span class="order-key">Results Available Date:</span> <span name="order-results-available">{{resultsAvailableDate}}</span></p>
      <p><span class="order-key">Notes:</span> <span name="order-notes">{{notes}}</span></p>
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

  // Function to iterate over orders and create markup for each
  function renderAllOrders(orders) {
    return orders.map(renderOrderStatus).join("");
  }

  const orderStatusMarkup = document.createElement("h1");
  orderStatusMarkup.textContent = "Order Status";
  block.innerHTML = "";
  block.append(orderStatusMarkup);

  // Create a container for all orders with the correct class for styling
  const ordersContainer = document.createElement("div");
  ordersContainer.className = "order-status-container";
  ordersContainer.innerHTML = renderAllOrders(orderStatusJSON.orders);
  block.append(ordersContainer);
}
