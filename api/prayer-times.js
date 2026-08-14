module.exports = async (request, response) => {
  try {
    const source = await fetch('https://www.muslimkita.id/api/jadwal-sholat/v1/kediri?metode=kemenag');
    if (!source.ok) throw new Error('Sumber jadwal tidak merespons');
    const payload = await source.json();
    const schedule = payload?.jadwal;
    if (!schedule?.subuh || !schedule?.dzuhur || !schedule?.ashar || !schedule?.maghrib || !schedule?.isya) throw new Error('Format jadwal tidak tersedia');
    response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    response.status(200).json({ schedule });
  } catch {
    response.status(503).json({ error: 'Jadwal salat belum dapat dimuat.' });
  }
};
