import Nexmo from "nexmo"

export function createSmsFactory(){
    const nexmo = new Nexmo({
        apiKey : "ca2f06db",
        apiSecret : "e9J437ECzGfOyZeD"
    })

    //@ts-ignore
    return nexmo.message.sendSms
}