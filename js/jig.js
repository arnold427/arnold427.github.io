TRANSLATIONS = [
  ["apartment","APT","APARTMENT","Apt."],
  ["avenue", "AVENUE", "AV","AVE","AVEN","AVENU","AVNUE","Ave."],
  ["boulevard", "BLVD", "BOUL","BOULEVARD","BOULV","Blvd."],
  ["circle", "CIRCLE","CIR","CIRC","CIRCL","CIRCLE","CRCL","CRCLE","Cir."],
  ["drive", "DR", "DRIV","DRIVE","DRV","Dr."],
  ["flat","FLAT","FLT","Flt."],
  ["house","HOUSE","HSE","Hse."],
  ["street", "ST","STRT","STR","STREET"],
  ["road","RD","ROAD","Rd."],
  ["lane", "LANE.", "LN","Ln."],
  ["west", "w.", "w","WEST"],
  ["east", "e.", "e","EAST"],
  ["north", "n.", "n","NORTH"],
  ["south", "s.", "s","SOUTH"],
  ["east", "e.", "e","EAST"],
  ["mountain", "MOUNTAIN", "Mtn","MNTAIN","MNTN","MOUNTIN","MTIN"],
  ["valley","VALLEY","VALLY","VLLY","VLY","Vly."]

];

UNITS = [];

PREFIXES = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF"];

function jigAddress(addressString) {
  jigs = new Set([addressString]);
  lines = addressString.split("\n");
  parts = lines[0].split(" ");
  console.log("Address Lines: " + lines);
  console.log("Address parts: " + parts);
  for (var index = 0; index < parts.length; index++) {
    part = parts[index];
    TRANSLATIONS.forEach(entry => {
      possibleJigs = [];
      entry.forEach(val => {
        if (part.toLowerCase() === val) {
          entry.forEach(value => {
            if (value !== val && (!value.endsWith(".") || part.endsWith("."))) {
              possibleJigs.push(value);
            }
          });
        }
      });
      possibleJigs.forEach(jig => {
        jigs.forEach(address => {
          fullJig = "";
          valueLines = address.split("\n");
          valueParts = valueLines[0].split(" ");
          for (var i = 0; i < valueParts.length; i++) {
            fullJig += (i !== index ? valueParts[i] : jig) + " ";
          }
          fullJig = fullJig.substring(0, fullJig.length - 1);
          for (var i = 1; i < valueLines.length; i++) {
            fullJig += "\n" + valueLines[i];
          }
          jigs.add(fullJig);
        });
      });
    });
  }
  if (parts.length >= 3) {
    jigs.forEach(address => {
      if (lines.length == 1 && !address.includes("\n")) {
        addressParts = address.split(" ");
        for (var i = 2; i < addressParts.length; i++) {
          if (addressParts.length == 3) {
            if (addressParts[2].length < 3) {
              continue;
            }
          }
          splitAddress = "";
          for (var j = 0; j < i; j++) {
            splitAddress += addressParts[j] + " ";
          }
          splitAddress =
            splitAddress.substring(0, splitAddress.length - 1) + "\n";
          for (var j = i; j < addressParts.length; j++) {
            splitAddress += addressParts[j] + " ";
          }
          jigs.add(splitAddress.substring(0, splitAddress.length - 1));
        }
      }
    });
  }
  return jigs;
}

function addUnitsToAddresses(addresses) {
  unitAddresses = new Set();
  addresses.forEach(address => {
    if (!address.includes("\n")) {
      UNITS.forEach(unit => {
        unitAddresses.add(address + "\n" + unit);
      });
    }
  });
  return unitAddresses;
}

function addPrefixesToAddresses(addresses) {
  newAddresses = new Set();
  addresses.forEach(address => {
    addressParts = address.split("\n");
    PREFIXES.forEach(prefix => {
      newAddress = prefix + " " + addressParts[0];
      for (var i = 1; i < addressParts.length; i++) {
        newAddress += "\n" + addressParts[i];
      }
      newAddresses.add(newAddress);
    });
  });
  return newAddresses;
}
