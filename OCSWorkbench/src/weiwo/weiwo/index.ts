import WeiwoRequest from '../models/weiwoRequest';
import WeiwoResponse from '../models/weiwoResponse';
import axios from 'axios';
import StorageTool from '../storage-tool';

// MARK: default configuration
const simulatorIP = '127.0.0.1:2222';
const storageKeyDeviceIPs = 'deviceIPs';

function WeiwoSerializeArgument(arg: any): any {
  const type = typeof arg;
  if (type == 'number' || type == 'string' || type == 'boolean' || arg == null) {
    return arg;
  } else if (Array.isArray(arg)) {
    return arg.map(WeiwoSerializeArgument);
  } else if (type == 'object') {
    if (arg.target) {
      return arg.target;
    } else {
      return { type: 'raw', value: arg };
    }
  } else {
    return null;
  }
}

class Weiwo {
  static DeviceIPs: Array<string> = StorageTool.loadUniqueStringArray(storageKeyDeviceIPs, [simulatorIP]);
  static $: Weiwo = Weiwo.vm()
  static GatewayHost = 'app.ocp';
  static MainQueue = 1;
  static ContainerAsValue = 1 << 1;

  target: object;
  url: string;

  constructor(target: object, deviceSpec?: number | string) {
    this.target = target;

    const specType = typeof deviceSpec;
    if (specType == 'string') {
      this.url = <string>deviceSpec;
    } else if (specType == 'number') {
      const deviceIndex = <number>deviceSpec;
      this.url = Weiwo.makeURLWithDeviceIP(Weiwo.DeviceIPs[deviceIndex]);
    } else {
      this.url = Weiwo.defaultURL();
    }
  }

  async callBlock(blockAST: object, args: Array<any>, flags?: number): Promise<any> {
    const block = new Weiwo(blockAST, this.url);
    return await block.invoke('call', args, flags);
  }

  static vm(deviceSpec?: number | string) {
    return new Weiwo({ type: 'weiwo' }, deviceSpec);
  }

  async invoke(methodName: string, args?: Array<any>, flags?: number): Promise<any> {
    const body: WeiwoRequest = new WeiwoRequest();
    body.methodName = methodName;
    if (this.target != null) {
      body.target = this.target;
    }
    if (args != undefined) {
      body.args = args.map(WeiwoSerializeArgument);
    }

    if (flags != undefined) {
      if (flags & Weiwo.MainQueue) {
        body.mainQueue = true;
      }

      if (flags & Weiwo.ContainerAsValue) {
        body.containerAsValue = true;
      }
    }

    return this.sendRequest(body);
  }

  async executeCode(ast: object): Promise<any> {
    return this.sendRequest({ ast });
  }

  // Network
  async sendRequest(body: object): Promise<any> {
    const url = this.url ? this.url : Weiwo.defaultURL()
    console.log('requesting: ' + url);
    console.log('ast: ' + JSON.stringify(body));
    try {
      const dict = <WeiwoResponse>(await axios.post(url, body, { timeout: 30000 })).data;

      if (dict.ok) {
        const result = dict.result
        const resultType = typeof result
        if (resultType == 'number' || resultType == 'string' || resultType == 'boolean' || result == null) {
          return result;
        } else if (resultType == 'object') {
          if (result.type == 'raw') {
            return result.value;
          } else {
            return new Weiwo(result, url);
          }
        }
      } else {
        return Promise.reject(new Error(dict.msg));
      }
    } catch (err) {
      console.error('[OCSWorkbench] ' + err);
      return undefined;
    }
  }

  // Manage device IPs
  static saveDeviceIPs(deviceIPs: Array<string>): void {
    // @see https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    // BUG: return [] using [... new Set(deviceIPs)];
    //Weiwo.DeviceIPs = [... new Set(deviceIPs)];

    Weiwo.DeviceIPs = deviceIPs.filter((item, pos) => {
      return deviceIPs.indexOf(item) == pos;
    });
    console.log(deviceIPs);
    console.log(Weiwo.DeviceIPs);

    StorageTool.saveStringArrayToStorage(storageKeyDeviceIPs, Weiwo.DeviceIPs);
  }

  static resetDeviceIPsToDefault(): void {
    StorageTool.removeItem(storageKeyDeviceIPs);
    Weiwo.DeviceIPs = StorageTool.loadUniqueStringArray(storageKeyDeviceIPs, []);
  }

  static makeHost(str: string): string {
    if (!str.includes('.')) {
      return `${this.GatewayHost}:9010/${str}`;
    }

    return str.includes(':') ? str : `${str}:9000`;
  }

  static defaultURL(): string {
    return Weiwo.makeURLWithDeviceIP(Weiwo.defaultDeviceIP());
  }

  static defaultDeviceIP(): string {
    if (Weiwo.DeviceIPs[0]) {
      return Weiwo.DeviceIPs[0];
    } else {
      return simulatorIP;
    }
  }

  // REST style request
  static makeURLWithDeviceIP(deviceIP: string): string {
    return `http://${this.makeHost(deviceIP)}/call`;
  }

  static makeDataURLWithDeviceIP(deviceIP: string, name: string): string {
    return `http://${this.makeHost(deviceIP)}/data/${name}`;
  }

  static createLogSocket(type: string, complete: boolean, callback?: (dict: object) => void): WebSocket {
    const defaultDeviceIP = this.defaultDeviceIP();
    const address = this.makeHost(defaultDeviceIP);
    let url = `ws://${address}/log?type=${type}`;
    if (complete) {
      url += '&complete=true&batch=true';
    }

    const websocket = new WebSocket(url);
    if (callback) {
      websocket.onmessage = (event) => callback(JSON.parse(event.data) as object);
    }

    return websocket;
  }

  static async gc(spec?: string | number): Promise<void> {
    const interpreter = Weiwo.vm(spec);
    await interpreter.invoke('gc');
  }
}

export default Weiwo;
