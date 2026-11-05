# Nuvio Serien CH

Ein eigenständiges Nuvio-Repository mit dem SerienStream-Provider (nur Serien). Es verändert das bestehende Film-Repository nicht.

## Neues GitHub-Repository erstellen

1. Auf GitHub ein öffentliches Repository namens `nuvio-serienstream` erstellen. **Kein** README automatisch erzeugen.
2. Alle Dateien **einschliesslich** `.github/workflows/pages.yml` mit derselben Ordnerstruktur hochladen und auf `main` committen.
3. Unter **Settings > Pages > Build and deployment > Source** die Option **GitHub Actions** wählen.
4. Unter **Actions** prüfen, ob der Workflow erfolgreich ausgeführt wurde. Bei Bedarf `Build and publish Nuvio plugin` manuell starten.
5. In Nuvio die folgende Manifest-URL hinzufügen (erst nach erfolgreichem Deployment):

`https://aribari15.github.io/nuvio-serienstream/manifest.json`

## Automatische Aktualisierung

Der SerienStream-Provider fragt die Website **bei jeder Wiedergabeanfrage live** ab. Neue Episoden und verfügbare Streams benötigen deshalb keinen neuen GitHub-Build. Die Erkennung funktioniert nur, wenn die Website erreichbar ist, der jeweilige Titel gefunden wird und der externe Provider kompatibel bleibt.

Zusätzlich startet GitHub Actions **täglich** einen Build und lädt dabei den aktuellen Provider-Code von `InvalidPandaa/nuvio-german-providers`. So können Fehlerkorrekturen des Upstream-Projekts automatisch veröffentlicht werden. GitHub kann geplante Läufe verzögern oder unter bestimmten Bedingungen deaktivieren; der Build ist daher nicht garantiert. Der tägliche Build ist **keine vollständige Synchronisierung aller Serien**.

**Wichtig:** Das Nuvio-Plugin ist ein Stream-Provider und kein eigenständiger Serienkatalog. Die neu auf der Website aufgeführten Serien erscheinen dadurch nicht automatisch als neue Einträge auf der Nuvio-Startseite. Die Such- und Katalogansicht hängt von Nuvios Metadatenquellen ab. Eine separate Katalogintegration wäre für dieses Ziel erforderlich.

## Lokal testen

Node.js 20+ benötigt:

```sh
node test.mjs
node build.mjs
node test.mjs --dist
```

Der Build lädt den aktuellen Provider-Code von `InvalidPandaa/nuvio-german-providers`. Die Tests prüfen nur Aufbau und Dateiformat, **nicht**, ob eine Folge im Nuvio-Player abgespielt wird. Änderungen am externen Provider oder Captchas können die Funktion beeinträchtigen.

## Lizenz und Herkunft

Die Provider-Implementierung stammt aus [InvalidPandaa/nuvio-german-providers](https://github.com/InvalidPandaa/nuvio-german-providers), lizenziert unter GPL-3.0-or-later. Bei Weiterverteilung die GPL und die Urheberhinweise beachten. Nur Inhalte verwenden, für die eine Nutzungsberechtigung besteht.
