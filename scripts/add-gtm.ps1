$ErrorActionPreference = 'Stop'

$gtmId = 'GTM-MV8ZQKRT'

$gtmScriptBlock = @"
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','$gtmId');</script>
<!-- End Google Tag Manager -->
"@

$gtmNoScriptBlock = @"
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=$gtmId"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
"@

function Add-GtmToHtmlFile {
  param(
    [Parameter(Mandatory = $true)][string]$Path
  )

  $content = Get-Content -LiteralPath $Path -Raw

  # Remove previous runtime-loader include if present.
  $content = $content -replace "(?m)^[ \t]*<script\s+src=['""]\/js\/gtm-loader\.js['""]>\s*<\/script>\s*\r?\n?", ""

  # If GTM already present, just write back the cleaned loader include removal (if any) and exit.
  if ($content -match [regex]::Escape($gtmId)) {
    Set-Content -LiteralPath $Path -Value $content -NoNewline
    return
  }

  # Insert GTM <script> right after <head ...>
  $headRegex = [regex]"(?is)(<head\b[^>]*>)"
  if ($headRegex.IsMatch($content)) {
    $content = $headRegex.Replace($content, "`$1`r`n$gtmScriptBlock", 1)
  } else {
    throw "No <head> tag found in: $Path"
  }

  # Insert GTM <noscript> right after <body ...>
  $bodyRegex = [regex]"(?is)(<body\b[^>]*>)"
  if ($bodyRegex.IsMatch($content)) {
    $content = $bodyRegex.Replace($content, "`$1`r`n$gtmNoScriptBlock", 1)
  } else {
    throw "No <body> tag found in: $Path"
  }

  Set-Content -LiteralPath $Path -Value $content -NoNewline
}

$root = (Resolve-Path .).Path
$htmlFiles = Get-ChildItem -LiteralPath $root -Recurse -File -Filter *.html |
  Where-Object { $_.FullName -notmatch "\\.git\\" }

foreach ($file in $htmlFiles) {
  Add-GtmToHtmlFile -Path $file.FullName
}

Write-Host ("Updated {0} HTML files." -f $htmlFiles.Count)
