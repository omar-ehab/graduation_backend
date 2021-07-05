import semver from 'semver';
import { LocalStorage } from 'node-localstorage';
const localstorage = new LocalStorage('./services_db');

class ServiceRegistry {
  constructor() {
    this.services = JSON.parse(localstorage.getItem('services'));
    this.timeout = 100000000; //in seconds
  }
  
  async get(name, version) {
    await this.cleanup();
    this.services = JSON.parse(localstorage.getItem('services'));
    const candidates = Object.values(this.services).filter(service => {
      return service.name === name && semver.satisfies(service.version, version);
    });
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  async register(name, version, ip, port){
    await this.cleanup();
    this.services = JSON.parse(localstorage.getItem('services'));
    const key = name + version + ip + port;
    if(!this.services[key]) {
      this.services[key] = {
        timestamp: Math.floor(new Date() / 1000),
        ip,
        port,
        name,
        version
      };
      console.log(JSON.stringify(this.services));
      localstorage.setItem('services', JSON.stringify(this.services));
      console.log(`Added Service ${name}, version: ${version}, at ${ip}:${port}`);
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    localstorage.setItem('services', JSON.stringify(this.services));
    console.log(`Updated Service ${name}, version: ${version}, at ${ip}:${port}`);
    return key;
  }

  async unregister(name, version, ip, port)
  {
    this.services = JSON.parse(localstorage.getItem('services'));
    const key = name + version + ip + port;
    delete this.services[key];
    await localstorage.setItem("services", JSON.stringify(this.services));
    console.log(`Deleted Service ${name}, version: ${version}, at ${ip}:${port}`);
    return key;
  }


  async cleanup() {
    this.services = JSON.parse(localstorage.getItem('services'));
    const now = Math.floor(new Date() / 1000);
    await Object.keys(this.services).forEach(key => {
      if(this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        localstorage.setItem('services', JSON.stringify(this.services));
        console.log(`Removed Service ${key}`);
      }
    });
  }
}

export default ServiceRegistry;