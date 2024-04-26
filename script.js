(function() {
  let servers = [
    {url: "54.169.225.106", port: "19132", name: "Proxy Server"},
    {url: "31.6.2.160", port: "25658", name: "Lobby Server"},
    {url: "45.133.9.167", port: "26048", name: "Survival Server"},
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
      $('#count').html(`${serverCount} Servers`);
      let onlineCount = $('.online').length;
      let offlineCount = $('.offline').length;
      $('#summary-one').html(`${onlineCount} Servers`);
      $('#summary-two').html(`${offlineCount} Servers`);
    });
  }
})();

$("#btn-icon").click(function() {
	$(this).find("i").toggleClass("fa-bars fa-x");
    $("#menu").toggle();
});
