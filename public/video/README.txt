4 clips power the site, all re-encoded 1280x720 / CRF 26 / faststart / no audio:

hero.mp4        -> plan 1, reveal carrosserie (HERO section)
chassis.mp4     -> plan 2, chassis transparence (CHÂSSIS section)
engine.mp4      -> plan 3, groupe motopropulseur (MOTEUR section)
hero-alt.mp4    -> second studio take, reused for the SIGNATURE section (car fully
                   reconstituted -- same shot type as hero.mp4, different generation)

Each has a matching .jpg poster frame (first frame of the encode), shown instantly while
the video streams in.

To re-encode a new raw export the same way:
  ffmpeg -i raw.mp4 -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 26 \
    -pix_fmt yuv420p -an -movflags +faststart out.mp4
  ffmpeg -i out.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 4 out.jpg

The 4x4, cabin, terrain and technologie sections from the original brief were dropped
(no footage was generated for them) -- the site is now a tighter 4-section arc: hero,
châssis, moteur, signature. Re-add a section by pairing a clip here with an entry in
src/data/sections.js if more footage shows up later.
