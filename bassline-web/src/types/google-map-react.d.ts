declare module 'google-map-react' {
  import * as React from 'react';

  interface BootstrapURLKeys {
    key?: string;
    client?: string;
    version?: string;
    language?: string;
    region?: string;
    libraries?: string[] | string;
    id?: string;
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers: any[];
  }

  interface MapOptions {
    backgroundColor?: string;
    clickableIcons?: boolean;
    controlSize?: number;
    disableDefaultUI?: boolean;
    disableDoubleClickZoom?: boolean;
    draggable?: boolean;
    draggableCursor?: string;
    draggingCursor?: string;
    fullscreenControl?: boolean;
    fullscreenControlOptions?: { position: number };
    gestureHandling?: string;
    heading?: number;
    keyboardShortcuts?: boolean;
    mapId?: string;
    mapTypeControl?: boolean;
    mapTypeControlOptions?: any;
    mapTypeId?: string;
    minZoom?: number;
    maxZoom?: number;
    noClear?: boolean;
    options?: ((maps: Maps) => Props) | undefined;
    panControl?: boolean;
    panControlOptions?: { position: number };
    rotateControl?: boolean;
    rotateControlOptions?: { position: number };
    scaleControl?: boolean;
    scaleControlOptions?: any;
    scrollwheel?: boolean;
    streetView?: any;
    streetViewControl?: boolean;
    streetViewControlOptions?: { position: number };
    styles?: MapTypeStyle[];
    tilt?: number;
    zoomControl?: boolean;
    zoomControlOptions?: { position: number };
    minZoomOverride?: boolean;
  }

  interface Maps {
    Animation: {
      BOUNCE: number;
      DROP: number;
      Qz: number;
      Uz: number;
    };
    ControlPosition: {
      BOTTOM: number;
      BOTTOM_CENTER: number;
      BOTTOM_LEFT: number;
      BOTTOM_RIGHT: number;
      CENTER: number;
      LEFT: number;
      LEFT_BOTTOM: number;
      LEFT_CENTER: number;
      LEFT_TOP: number;
      RIGHT: number;
      RIGHT_BOTTOM: number;
      RIGHT_CENTER: number;
      RIGHT_TOP: number;
      TOP: number;
      TOP_CENTER: number;
      TOP_LEFT: number;
      TOP_RIGHT: number;
    };
    DirectionsStatus: {
      INVALID_REQUEST: string;
      MAX_WAYPOINTS_EXCEEDED: string;
      NOT_FOUND: string;
      OK: string;
      OVER_QUERY_LIMIT: string;
      REQUEST_DENIED: string;
      UNKNOWN_ERROR: string;
      ZERO_RESULTS: string;
    };
    DirectionsTravelMode: {
      BICYCLING: string;
      DRIVING: string;
      TRANSIT: string;
      TWO_WHEELER: string;
      WALKING: string;
    };
    DirectionsUnitSystem: {
      IMPERIAL: number;
      METRIC: number;
    };
    DistanceMatrixStatus: {
      INVALID_REQUEST: string;
      MAX_DIMENSIONS_EXCEEDED: string;
      MAX_ELEMENTS_EXCEEDED: string;
      OK: string;
      OVER_QUERY_LIMIT: string;
      REQUEST_DENIED: string;
      UNKNOWN_ERROR: string;
    };
    DistanceMatrixElementStatus: {
      NOT_FOUND: string;
      OK: string;
      ZERO_RESULTS: string;
    };
    ElevationStatus: {
      INVALID_REQUEST: string;
      OK: string;
      OVER_QUERY_LIMIT: string;
      REQUEST_DENIED: string;
      UNKNOWN_ERROR: string;
      yz: string;
    };
    GeocoderLocationType: {
      APPROXIMATE: string;
      GEOMETRIC_CENTER: string;
      RANGE_INTERPOLATED: string;
      ROOFTOP: string;
    };
    GeocoderStatus: {
      OK: string;
      UNKNOWN_ERROR: string;
      OVER_QUERY_LIMIT: string;
      REQUEST_DENIED: string;
      INVALID_REQUEST: string;
      ZERO_RESULTS: string;
      ERROR: string;
    };
    KmlLayerStatus: {
      DOCUMENT_NOT_FOUND: string;
      DOCUMENT_TOO_LARGE: string;
      FETCH_ERROR: string;
      INVALID_DOCUMENT: string;
      INVALID_REQUEST: string;
      LIMITS_EXCEEDED: string;
      OK: string;
      TIMED_OUT: string;
      UNKNOWN: string;
    };
    MapTypeControlStyle: {
      DEFAULT: number;
      DROPDOWN_MENU: number;
      HORIZONTAL_BAR: number;
      INSET: number;
      INSET_LARGE: number;
    };
    MapTypeId: {
      HYBRID: string;
      ROADMAP: string;
      SATELLITE: string;
      TERRAIN: string;
    };
    MaxZoomStatus: {
      ERROR: string;
      OK: string;
    };
    NavigationControlStyle: {
      ANDROID: number;
      DEFAULT: number;
      Ot: number;
      SMALL: number;
      Vz: number;
      ZOOM_PAN: number;
    };
    RenderingType: {
      RASTER: string;
      UNINITIALIZED: string;
      VECTOR: string;
    };
    ScaleControlStyle: {
      DEFAULT: number;
    };
    StreetViewPreference: {
      BEST: string;
      NEAREST: string;
    };
    StreetViewStatus: {
      OK: string;
      UNKNOWN_ERROR: string;
      ZERO_RESULTS: string;
    };
    StreetViewSource: {
      DEFAULT: string;
      OUTDOOR: string;
    };
    StrokePosition: {
      CENTER: number;
      INSIDE: number;
      OUTSIDE: number;
    };
    SymbolPath: {
      CIRCLE: number;
      BACKWARD_CLOSED_ARROW: number;
      BACKWARD_OPEN_ARROW: number;
      FORWARD_CLOSED_ARROW: number;
      FORWARD_OPEN_ARROW: number;
    };
    TrafficModel: {
      BEST_GUESS: string;
      OPTIMISTIC: string;
      PESSIMISTIC: string;
    };
    TransitMode: {
      BUS: string;
      RAIL: string;
      SUBWAY: string;
      TRAIN: string;
      TRAM: string;
    };
    TransitRoutePreference: {
      FEWER_TRANSFERS: string;
      LESS_WALKING: string;
    };
    TravelMode: {
      BICYCLING: string;
      DRIVING: string;
      TRANSIT: string;
      TWO_WHEELER: string;
      WALKING: string;
    };
    UnitSystem: {
      IMPERIAL: number;
      METRIC: number;
    };
    ZoomControlStyle: {
      DEFAULT: number;
      LARGE: number;
      Ot: number;
      SMALL: number;
    };
  }

  interface Bounds {
    nw: Coords;
    ne: Coords;
    sw: Coords;
    se: Coords;
  }

  interface Point {
    x: number;
    y: number;
  }

  interface NESWBounds {
    ne: Coords;
    sw: Coords;
    nw?: Coords;
    se?: Coords;
  }

  interface Coords {
    lat: number;
    lng: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface ClickEventValue extends Point, Coords {
    event: any;
  }

  interface ChangeEventValue {
    center: Coords;
    zoom: number;
    bounds: Bounds;
    marginBounds: Bounds;
    size: Size;
  }

  interface Position {
    lat: number;
    lng: number;
    weight?: number;
  }

  interface Heatmap {
    positions: Position[];
    options: {
      radius?: number;
      opacity?: number;
    };
  }

  interface Props {
    children?: React.ReactNode;
    bootstrapURLKeys?: BootstrapURLKeys;
    defaultCenter?: Coords;
    center?: Coords;
    defaultZoom?: number;
    zoom?: number;
    heatmapLibrary?: boolean;
    hoverDistance?: number;
    options?: MapOptions | ((maps: Maps) => MapOptions);
    margin?: any[];
    debounced?: boolean;
    draggable?: boolean;
    layerTypes?: string[];
    onClick?(value: ClickEventValue): any;
    onChange?(value: ChangeEventValue): any;
    resetBoundsOnResize?: boolean;
    onChildClick?(hoverKey: any, childProps: any): void;
    onChildMouseEnter?(hoverKey: any, childProps: any): void;
    onChildMouseLeave?(hoverKey: any, childProps: any): void;
    onChildMouseDown?(childKey: any, childProps: any, mouse: any): void;
    onChildMouseUp?(childKey: any, childProps: any, mouse: any): void;
    onChildMouseMove?(childKey: any, childProps: any, mouse: any): void;
    onDrag?(map: any): void;
    onDragEnd?(map: any): void;
    onZoomAnimationStart?(args: any): void;
    onZoomAnimationEnd?(args: any): void;
    onMapTypeIdChange?(args: any): void;
    distanceToMouse?(pt: Point, mousePos: Point, markerProps?: object): number;
    googleMapLoader?(bootstrapURLKeys: any): void;
    onGoogleApiLoaded?(maps: { map: any; maps: any; ref: Element | null }): void;
    onTilesLoaded?(): void;
    yesIWantToUseGoogleMapApiInternals?: boolean;
    style?: React.CSSProperties;
    shouldUnregisterMapOnUnmount?: boolean;
    heatmap?: Heatmap;
  }

  interface ChildComponentProps extends Coords {
    $hover?: boolean;
  }

  interface Tile extends Point {
    zoom: number;
  }

  const GoogleMapReact: React.ComponentType<Props>;

  export default GoogleMapReact;

  export {
    convertNeSwToNwSe,
    convertNwSeToNeSw,
    fitBounds,
    meters2ScreenPixels,
    tile2LatLng,
    latLng2Tile,
    getTilesIds,
  };

  function convertNeSwToNwSe(boundCorder: { ne: Coords; sw: Coords }): { nw: Coords; se: Coords };
  function convertNwSeToNeSw(boundCorder: { nw: Coords; se: Coords }): { ne: Coords; sw: Coords };
  function fitBounds(bounds: NESWBounds, size: Size): { center: { lat: number; lng: number }; zoom: number; newBounds: Bounds };
  function meters2ScreenPixels(meters: number, coords: Coords, zoom: number): { w: number; h: number };
  function tile2LatLng(point: Point, zoom: number): { coords: Coords };
  function latLng2Tile(coords: Coords, zoom: number): { point: Point };
  function getTilesIds(start: { from: number; to: number }, zoom: number): Tile[];
}