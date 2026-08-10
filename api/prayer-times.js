export default async function handler(request, response) {
  try {
    const cityId = 'eda80a3d5b344bc40f3bc04f65b7a357';
    const apiResponse = await fetch(`https://api.myquran.com/v3/sholat/jadwal/${cityId}/today?tz=Asia/Jakarta`);
    if (!apiResponse.ok) throw new Error('Sumber jadwal tidak merespons');
    const payload = await apiResponse.json();
    const schedule = payload?.data?.jadwal || payload?.data;
    if (!schedule?.subuh || !schedule?.dzuhur || !schedule?.ashar || !schedule?.maghrib || !schedule?.isya) throw new Error('Format jadwal tidak tersedia');
    response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    response.status(200).json({ schedule });
  } catch {
    response.status(503).json({ error: 'Jadwal salat belum dapat dimuat.' });
  }
}
