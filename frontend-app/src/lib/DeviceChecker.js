
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export default async function DeviceChecker() {
    const headersList = await headers();
    const userAgentHeader = headersList.get("user-agent") || "";
    
    const parser = new UAParser(userAgentHeader);
    const device = parser.getDevice();
    
    const deviceType = device?.type;
    console.log("Is Mobile: ", deviceType);


    return deviceType === "mobile" || deviceType === "tablet";
}