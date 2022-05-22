let storageKeyScript: string = 'script';

function loadScripts(): NameSourcePair[] {
  const scripts = localStorage.getItem(storageKeyScript)
  return scripts ? JSON.parse(scripts) : []
}

function saveScripts(scripts: NameSourcePair[]) {
  localStorage.setItem(storageKeyScript, JSON.stringify(scripts))
}

export { loadScripts };
export { saveScripts };
