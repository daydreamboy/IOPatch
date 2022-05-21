type PlatformIconProps = {
  platform: 'iOS' | 'Android'
}

type AppStatus = PlatformIconProps & {
  bundleIdentifier: string
  bundleDisplayName: string
  did: string
}

type DevicePanelProps = {
  deviceIP: string
  index: number
  setDefaultCallback: () => void
  removeDeviceCallback: () => void
  showRemoveButton: boolean
}

type DevicePanelState = {
  status: 'offline' | 'fetching' | 'online'
  info: AppStatus | null
}
