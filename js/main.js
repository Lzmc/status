$(document).ready(function() {
    $('.container').hide();

    function showContent() {
        $('.loading-screen').fadeOut('slow', function() {
            $('.container').fadeIn('slow');
        });
    }

    setTimeout(showContent, 1000);

    const servers = [
        {url: "play.mklmc.lol", port: "7114", name: "Proxy Server", location: "Japan" },
        {url: "212.232.28.94", port: "25419", name: "Lobby Server", location: "Austria"},
        {url: "185.207.164.129", port: "22193", name: "Survival Server", location: "Singapore"},
        {url: "212.232.28.94", port: "26048", name: "Flat Server", location: "Austria"}
        
    ];
    
    function getServerStatus(serverType) {
        $('#server_cards').html("");
        servers.forEach(function(server, index) {
            if(serverType === 'all' || serverType === server.name.toLowerCase().replace(' ', '')) {
                let serverUrl = server.url;
                let serverPort = server.port;
                let serverName = server.name;
                let serverLocation = server.location;
                let serverUrlFull = `https://api.minetools.eu/ping/${serverUrl}/${serverPort}`;

                $.getJSON(serverUrlFull, function(response) {
                    let status = response.error ? 'Offline' : 'Online';
                    let statusClass = response.error ? 'offline' : 'online';
                    let card = `<div class="card">
                        <p class="card-title">${serverName}</p>
                        <p>Location: ${serverLocation}</p>
                        <p>Status: <span class="${statusClass}">${status}</span></p>
                    </div>`;
                    $('#server_cards').append(card);
                });
            }
        });
    }

    getServerStatus('all');
    setInterval(function() {
        getServerStatus('all');
    }, 60000);

    $('.menu-toggle').click(function() {
        $('.header-nav-list').toggleClass('active');
        $('.main').toggleClass('blur');
    });
});
