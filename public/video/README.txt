4 clips power the site, all re-encoded 1280x720 / CRF 26 / faststart / no audio, with a
short GOP so scroll-driven seeking stays smooth (see gotcha below):

hero.mp4        -> plan 1, reveal carrosserie (HERO section)
chassis.mp4     -> plan 2, chassis transparence (CHÂSSIS section)
engine.mp4      -> plan 3, groupe motopropulseur (MOTEUR section)
hero-alt.mp4    -> second studio take, reused for the SIGNATURE section (car fully
                   reconstituted -- same shot type as hero.mp4, different generation)

Each has a matching .jpg poster frame (first frame of the encode), shown instantly while
the video streams in.

To re-encode a new raw export the same way:
  ffmpeg -i raw.mp4 -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 26 \
    -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -pix_fmt yuv420p -an -movflags +faststart out.mp4
  ffmpeg -i out.mp4 -vf "select=eq(n\,0)" -vframes 1 -q:v 4 out.jpg

GOTCHA -- keyframe interval, not just resolution/bitrate, is what makes scroll-scrubbing
feel smooth. x264's default GOP is ~250 frames, so an 8s/24fps clip can end up with a
SINGLE keyframe at frame 0 -- every scroll-driven seek then has to decode from frame 0
forward, which is what caused the freezing/stutter we hit before adding `-g 6
-keyint_min 6 -sc_threshold 0 -bf 0` (keyframe every 0.25s, no B-frames so every frame's
dependency chain is short). Check with:
  ffprobe -select_streams v:0 -show_entries frame=pict_type -of csv=p=0 out.mp4 | sort | uniq -c
You want many `I` frames spread evenly through the output, not just one.

The 4x4, cabin, terrain and technologie sections from the original brief were dropped
(no footage was generated for them) -- the site is now a tighter 4-section arc: hero,
châssis, moteur, signature. Re-add a section by pairing a clip here with an entry in
src/data/sections.js if more footage shows up later.
