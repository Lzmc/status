(function() {
    let servers = [
        {url: "play.mklmc.lol", port: "7114", name: "Proxy Server", location: "Japan"},
        {url: "212.232.28.94", port: "25419", name: "Lobby Server", location: "Austria"},
        {url: "212.232.28.94", port: "26048", name: "Survival Server", location: "Singapore"},
        {url: "212.232.28.94", port: "26048", name: "Old Survaval Server", location: "Austria"},
    ];
    getServerStatus();
    setInterval(getServerStatus, 60000);
    function getServerStatus() {
        $('#server_cards').html("");
        let promises = [];
        for (let i = 0; i < servers.length; i++) {
            let serverUrl = servers[i].url;
            let serverPort = servers[i].port;
            let serverName = servers[i].name;
            let serverLocation = servers[i].location;
            let serverUrlFull = `https://api.minetools.eu/ping/${serverUrl}/${serverPort}`;
            let card = $(`
  <div class="col">
      <div class="card h-100">
          <div class="card-body">
              <p class="card-title">${serverName}</p>
              <p class="card-text">Location: ${serverLocation}</p>
              <p class="card-text" id="status${i}">Status: Loading...</p>
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
                    $(`#status${i}`).html('Status: Offline').addClass('offline');
                    continue;
                }
                $(`#status${i}`).html('Status: Online').addClass('online');
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
