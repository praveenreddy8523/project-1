export default class Project {
    constructor(name, description, sourcecountry, sourceport, destinationcountry, destinationport, tag) {
      this.name = name || "";
      this.description = description || "";
      this.sourcecountry = sourcecountry || "";
      this.sourceport = sourceport || "";
      this.destinationcountry = destinationcountry || "";
      this.destinationport = destinationport || "";
      this.tag = tag || "";
    }
  }