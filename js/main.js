const url = "https://72.177.61.58:5000/"

const GET = async (src) => {
    let data = await fetch(url + src, {headers: {'Content-Type': 'application/json'}})
    return await data.json()
}

const POST = async (src, query) => {
    let data = await fetch(url + src, {body: JSON.stringify(query), method: 'POST', headers: {'Content-Type': 'application/json'}})
    return await data.json()
}

async function load() {
    let responseJSON = await GET("getbotinfo")

    for (var guild in responseJSON) {
        //create divider
        let div = document.createElement("div")
        div.innerHTML = responseJSON[guild][0] + "<br>"
        div.id = guild
        //input field
        let input = document.createElement("input")
        input.value = "Enter Song"
        div.appendChild(input)
        div.appendChild(document.createElement("br"))
        document.body.appendChild(div)
        //populate divider with voice channels
        for (let voicechannel of responseJSON[guild][2]) {
            let vc = document.createElement("button")
            vc.innerHTML = voicechannel[1]
            vc.id = voicechannel[0]
            if (voicechannel[0] == responseJSON[guild][1][1]) {
                vc.style = "background: aqua"
                div.style = "border: 3px solid green"
            }
            vc.onclick = async function () {
                await POST("playsong", [div.id.toString(), vc.id.toString(), input.value])
                document.body.innerHTML = ""
                load()
            }
            div.appendChild(vc)
            div.appendChild(document.createElement("br"))
        }
    }
    let refresh = document.createElement("button")
    refresh.innerHTML = "Refresh"
    refresh.onclick = function () {
        document.body.innerHTML = ""
        load()
    }
    document.body.appendChild(refresh)
}
load()