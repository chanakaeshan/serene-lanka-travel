import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Compass } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Popular Sri Lankan destinations
const sriLankanDestinations = [
  {
    name: "Sigiriya Rock Fortress",
    coordinates: [80.7597, 7.9569],
    description: "Ancient rock fortress and UNESCO World Heritage site",
    category: "Cultural"
  },
  {
    name: "Kandy",
    coordinates: [80.6337, 7.2906],
    description: "Cultural capital with the Temple of the Tooth",
    category: "Cultural"
  },
  {
    name: "Ella",
    coordinates: [81.0462, 6.8667],
    description: "Mountain town famous for tea plantations and scenic railways",
    category: "Nature"
  },
  {
    name: "Mirissa",
    coordinates: [80.4586, 5.9485],
    description: "Beautiful beach town perfect for whale watching",
    category: "Beach"
  },
  {
    name: "Yala National Park",
    coordinates: [81.5086, 6.3725],
    description: "Premier wildlife sanctuary known for leopards",
    category: "Wildlife"
  },
  {
    name: "Galle",
    coordinates: [80.2170, 6.0535],
    description: "Historic fort city with colonial architecture",
    category: "Cultural"
  },
  {
    name: "Nuwara Eliya",
    coordinates: [80.7891, 6.9497],
    description: "Cool climate hill station in tea country",
    category: "Nature"
  },
  {
    name: "Unawatuna",
    coordinates: [80.2480, 6.0107],
    description: "Crescent-shaped beach with coral reefs",
    category: "Beach"
  },
  {
    name: "Dambulla",
    coordinates: [80.6518, 7.8561],
    description: "Cave temple complex with ancient Buddhist art",
    category: "Cultural"
  },
  {
    name: "Bentota",
    coordinates: [79.9992, 6.4260],
    description: "Beach resort town with water sports",
    category: "Beach"
  }
];

const MapIntegration = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<typeof sriLankanDestinations[0] | null>(null);
  const { toast } = useToast();

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [80.7718, 7.8731], // Center of Sri Lanka
        zoom: 7,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      // Add markers for destinations
      sriLankanDestinations.forEach((destination) => {
        const markerColor = {
          'Cultural': '#d97706',
          'Beach': '#0ea5e9',
          'Nature': '#16a34a',
          'Wildlife': '#dc2626'
        }[destination.category] || '#6b7280';

        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          width: 30px;
          height: 30px;
          background-color: ${markerColor};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s ease;
        `;

        markerElement.addEventListener('mouseenter', () => {
          markerElement.style.transform = 'scale(1.2)';
        });

        markerElement.addEventListener('mouseleave', () => {
          markerElement.style.transform = 'scale(1)';
        });

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(destination.coordinates as [number, number])
          .addTo(map.current!);

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 35 })
          .setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${destination.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${destination.description}</p>
              <span class="inline-block px-2 py-1 text-xs font-medium rounded-full" 
                    style="background-color: ${markerColor}20; color: ${markerColor};">
                ${destination.category}
              </span>
            </div>
          `);

        markerElement.addEventListener('click', () => {
          popup.addTo(map.current!);
          setSelectedDestination(destination);
          
          // Fly to destination
          map.current!.flyTo({
            center: destination.coordinates as [number, number],
            zoom: 12,
            duration: 2000
          });
        });
      });

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      });

      setShowTokenInput(false);
      toast({
        title: "Map Loaded Successfully!",
        description: "Click on the markers to explore different destinations in Sri Lanka.",
      });

    } catch (error) {
      toast({
        title: "Map Loading Failed",
        description: "Please check your Mapbox token and try again.",
        variant: "destructive",
      });
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    } else {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox public token.",
        variant: "destructive",
      });
    }
  };

  const resetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [80.7718, 7.8731],
        zoom: 7,
        duration: 2000
      });
      setSelectedDestination(null);
    }
  };

  return (
    <section id="map" className="py-16 bg-gradient-to-b from-travel-sky/20 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Explore Sri Lanka
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Interactive Destination Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the beautiful destinations across Sri Lanka. Click on the markers to learn more about each location.
          </p>
        </div>

        {/* Token Input */}
        {showTokenInput && (
          <Card className="max-w-md mx-auto mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="mapboxToken" className="text-sm font-semibold">
                    Mapbox Public Token
                  </Label>
                  <Input
                    id="mapboxToken"
                    type="text"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="Enter your Mapbox public token"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get your free token from{' '}
                    <a 
                      href="https://mapbox.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      mapbox.com
                    </a>
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Load Map
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Map Container */}
        <div className="relative">
          <Card className="overflow-hidden shadow-xl border-0">
            <div className="relative">
              <div 
                ref={mapContainer} 
                className="w-full h-[600px] bg-gray-100 rounded-lg"
                style={{ display: showTokenInput ? 'none' : 'block' }}
              />
              
              {/* Map overlays */}
              {!showTokenInput && (
                <>
                  {/* Legend */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h4 className="font-semibold mb-3 text-sm">Destination Categories</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-600 mr-2"></div>
                        Cultural Heritage
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
                        Beach & Coast
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                        Nature & Mountains
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                        Wildlife Parks
                      </div>
                    </div>
                  </div>

                  {/* Reset View Button */}
                  <Button
                    onClick={resetView}
                    className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-700 border border-gray-200"
                    size="sm"
                  >
                    <Compass className="h-4 w-4 mr-1" />
                    Reset View
                  </Button>

                  {/* Selected Destination Info */}
                  {selectedDestination && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{selectedDestination.name}</h4>
                          <p className="text-gray-600 mb-2">{selectedDestination.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {selectedDestination.coordinates[1].toFixed(4)}, {selectedDestination.coordinates[0].toFixed(4)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            selectedDestination.category === 'Cultural' ? 'bg-orange-100 text-orange-700' :
                            selectedDestination.category === 'Beach' ? 'bg-sky-100 text-sky-700' :
                            selectedDestination.category === 'Nature' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {selectedDestination.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Destination Grid */}
        {!showTokenInput && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {sriLankanDestinations.map((destination, index) => (
                <Card 
                  key={destination.name}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200"
                  onClick={() => {
                    if (map.current) {
                      map.current.flyTo({
                        center: destination.coordinates as [number, number],
                        zoom: 12,
                        duration: 2000
                      });
                      setSelectedDestination(destination);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm leading-tight">{destination.name}</h4>
                      <div className={`w-3 h-3 rounded-full ml-2 flex-shrink-0 ${
                        destination.category === 'Cultural' ? 'bg-orange-600' :
                        destination.category === 'Beach' ? 'bg-sky-500' :
                        destination.category === 'Nature' ? 'bg-green-600' :
                        'bg-red-600'
                      }`}></div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{destination.category}</span>
                      <Navigation className="h-3 w-3 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapIntegration;