function generateClientInfo(client) {
    
    return `Cliente: ${client.name}\nEmail: ${client.email}\nEndereço: ${client.address}`;
  }
  
  module.exports = { generateClientInfo };
  
