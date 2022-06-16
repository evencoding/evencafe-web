const { kakao } = window;

function KakaoMap(lat, lon) {
  const container = document.getElementById("myMap");
  const markerPosition = new kakao.maps.LatLng(lat, lon);
  const markers = new kakao.maps.Marker({
    position: markerPosition,
  });
  const options = {
    center: new kakao.maps.LatLng(lat, lon),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);
  markers.setMap(map);
}

export default KakaoMap;
