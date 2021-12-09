const decodeSoftwareVersion = (version) => {
  const decodedVersion = {}
  const totalBits = 64;
  let paddedVersion = version.toString(2).padStart(totalBits, '0')

  // Decode Implementation ID
  const implementationBin = paddedVersion.substring(0,16);
  const implementationHex = parseInt(implementationBin, 2).toString(16);
  if (implementationHex === '183b') {
    decodedVersion.implementation = 'rippled';
  }

  // Decode Major, minor and patch versions
  const majorVersionBin = paddedVersion.substring(16, 24);
  const minorVersionBin = paddedVersion.substring(24, 32);
  const patchVersionBin = paddedVersion.substring(32, 40);

  decodedVersion.major = parseInt(majorVersionBin, 2);
  decodedVersion.minor = parseInt(minorVersionBin, 2);
  decodedVersion.patch = parseInt(patchVersionBin, 2);
  decodedVersion.version = `${decodedVersion.major}.${decodedVersion.minor}.${decodedVersion.patch}`

  // Decode Release type and number
  const releaseTypeBin = paddedVersion.substring(40,42);
  const releaseNumberBin = paddedVersion.substring(42,48);
  if (releaseTypeBin === '10') {
    decodedVersion.release = 'RC';
  }
  if (releaseTypeBin === '01') {
    decodedVersion.release = 'beta';
  }
  if (decodedVersion.release === 'RC' || decodedVersion.release === 'beta') {
    decodedVersion.release_number = parseInt(releaseNumberBin, 2);
    decodedVersion.version = `${decodedVersion.version}-${decodedVersion.release}.${decodedVersion.release_number}`
  }

  decodedVersion.version_full = `${decodedVersion.implementation}-${decodedVersion.version}`
  return decodedVersion;
}

exports.decodeSoftwareVersion = decodeSoftwareVersion;
