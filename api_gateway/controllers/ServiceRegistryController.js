class ServiceRegistryController {

  constructor(serviceRegistry) {
    this.serviceRegistry = serviceRegistry;
  }

  store = async (req, res) => {
    const { name, version, port } = req.params;
    let ip =  req.connection.remoteAddress;

    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7)
    }
    ip = ip.includes("::") ? `[${req.connection.remoteAddress}]` : ip;
    const key = this.serviceRegistry.register(name, version, ip, port);
    res.json({ success: true, key });
  }

  destroy = (req, res) => {
    const { name, version, port } = req.params;
    let ip =  req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7)
    }
    ip = ip.includes("::") ? `[${req.connection.remoteAddress}]` : ip;
    const key = this.serviceRegistry.unregister(name, version, ip, port);
    res.json({ success: true, key });
  }
}

export default ServiceRegistryController;