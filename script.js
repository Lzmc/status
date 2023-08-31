(function() {
  let servers = [
    {url: "185.07.164.1", port: "3241", name: "Proxy Server"},
    {url: "185.07.164.1", port: "4241", name: "Lobby Server"},
    {url: "185.07.164.1", port: "34241", name: "Survival Server"},
    {url: "185.27.164.1", port: "321", name: "BoxPVP Server"},
    {url: "185.27.164.1", port: "34241", name: "SkyBlock Server"},
    {url: "185.07.164.1", port: "341", name: "OneBlock Server"},
    {url: "185.07.164.1", port: "3241", name: "Private Server"}
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