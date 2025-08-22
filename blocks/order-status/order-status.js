export default function decorate(block) {
  const orderStatusAPI =
    "https://apim.workato.com/venuv0/eds-forms-endpoints-v1/getOrders";

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

  // Function to iterate over orders and create markup for each
  function renderAllOrders(orders) {
    return orders.map(renderOrderStatus).join("");
  }

  fetch(orderStatusAPI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "api-token":
        "72e9157ec3edb8b64bbe109917633d5c32348386bc443900cc4a7dcf074069d1",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      ordersContainer.innerHTML = renderAllOrders(data.orders);
    })
    .catch((error) => {
      console.error("Error fetching order status:", error);
    });

  const orderStatusMarkup = document.createElement("h1");
  orderStatusMarkup.textContent = "Order Status";
  block.innerHTML = "";
  block.append(orderStatusMarkup);

  // Create a container for all orders with the correct class for styling
  const ordersContainer = document.createElement("div");
  ordersContainer.className = "order-status-container";

  block.append(ordersContainer);
}
