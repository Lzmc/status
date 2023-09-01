(function() {
  let servers = [
    {url: "lochost", port: "25556", name: "Proxy Server"},
    {url: "lzbox.us.to", port: "3064", name: "Lobby Server"},
    {url: "g2.moonodes.net", port: "25892", name: "Survival Server"},
    {url: "lzbox.us.to", port: "3077", name: "BoxPVP Server"},
    {url: "lochost", port: "25556", name: "SkyBlock Server"},
    {url: "lzsv.us.to", port: "21958", name: "OneBlock Server"},
    {url: "lzsv.us.to", port: "34241", name: "Private Server"}
  ];
  getServerStatus();
  function getServerStatus() {
    $('#server_cards').html("");
    let promises = [];
    for (let i = 0; i < servers.length; i++) {
      let serverUrl = servers[i].url;
      let serverPort = servers[i].port;
      let serverName = servers[i].name;
      let serverUrlFull = `https://api.minetools.eu/ping/${serverUrl}/${serverPort}`;
      let card = $(`<div class="col">
        <div class="card h-100">
          <div class="card-body">
              <p class="card-title">${serverName}</p>
	            <p class="card-text" id="status${i}">Loading...</p>
          </div>
        </div>
      </div>`);
      $('#server_cards').append(card);
      promises.push($.getJSON(serverUrlFull));
    }
    Promise.all(promises).then(function(responses) {
      for (let i = 0; i < responses.length; i++) {
        let api = responses[i];
        if (api.error) {
          $(`#status${i}`).html('Offline').addClass('offline');
          continue;
        }
        $(`#status${i}`).html('Online').addClass('online');
        if (api.favicon == null) {
          api.favicon = "pack.png";
        }
        $(`#favicon${i}`).attr('src', api.favicon);
      }
      let serverCount = servers.length;
      $('#count').html(`>> ${serverCount} Servers.`);
      let onlineCount = $('.online').length;
      let offlineCount = $('.offline').length;
      $('#summary-one').html(`>> ${onlineCount} Servers.`);
      $('#summary-two').html(`>> ${offlineCount} Servers.`);
    });
  }
})();

$("#btn-icon").click(function() {
	$(this).find("i").toggleClass("fa-bars fa-x");
    $("#menu").toggle();
});