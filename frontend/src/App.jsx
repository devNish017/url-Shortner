import { useState } from 'react'
import './App.css'
import axios from "axios"
import { Link2, Copy, Check, ArrowRight, Loader2 } from 'lucide-react'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const shortenUrl = async () => {
    if (!url.trim()) {
      setError('Paste a link first')
      return
    }
    setError('')
    setLoading(true)
    setShortUrl('')
    try {
      const res = await axios.post("https://url-shortner-4r1c.onrender.com/shorten", {
        originalUrl: url
      })
      setShortUrl(res.data.shortUrl)
    } catch (err) {
      console.log(err)
      setError('Could not shorten that link. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') shortenUrl()
  }

  const handleCopy = async () => {
    if (!shortUrl) return
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="page">
      <div className="glow" />

      <div className="card">
        <div className="brand">
          <span className="brand-icon"><Link2 size={18} strokeWidth={2.4} /></span>
          <span className="brand-name">snip</span>
        </div>

        <h1 className="title">Make long links short</h1>
        <p className="subtitle">Paste a URL, get a clean short link back. That's it.</p>

        <div className="input-row">
          <input
            type="text"
            className="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/your/very/long/link"
            spellCheck={false}
          />
          <button className="shorten-btn" onClick={shortenUrl} disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="spin" />
            ) : (
              <>Shorten<ArrowRight size={16} /></>
            )}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className={`result ${shortUrl ? 'result-visible' : ''}`}>
          {shortUrl && (
            <div className="result-row">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="short-link"
              >
                {shortUrl}
              </a>
              <button className="copy-btn" onClick={handleCopy} aria-label="Copy short link">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="footnote">Links are shortened locally on your server.</p>
    </div>
  )
}

export default App
