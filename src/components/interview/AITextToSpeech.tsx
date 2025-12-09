import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AITextToSpeechProps {
  text: string;
  autoPlay?: boolean;
}

const AITextToSpeech: React.FC<AITextToSpeechProps> = ({
  text,
  autoPlay = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const previousTextRef = useRef<string>("");

  useEffect(() => {
    // Only speak if text has changed and is not empty
    if (text && text !== previousTextRef.current && autoPlay && !isMuted) {
      speak(text);
      previousTextRef.current = text;
    }
  }, [text, autoPlay, isMuted]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (textToSpeak: string) => {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Configure voice settings
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  const handleManualSpeak = () => {
    if (text && !isSpeaking) {
      speak(text);
    } else if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="w-full h-full  rounded-lg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>

      {/* AI Avatar/Bubble */}
      <div className="relative z-10 mb-4">
        <div
          className={`relative w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center transition-all duration-300 ${
            isSpeaking
              ? "scale-110 shadow-2xl shadow-purple-500/50"
              : "scale-100"
          }`}
        >
          {/* Outer pulse rings when speaking */}
          {isSpeaking && (
            <>
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
            </>
          )}

          {/* Inner animated circles */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div
              className={`absolute w-full h-full rounded-full bg-white/40 transition-transform duration-150 ${
                isSpeaking ? "animate-bounce" : ""
              }`}
            ></div>
            <div
              className={`absolute w-3/4 h-3/4 rounded-full bg-white/60 transition-transform duration-200 ${
                isSpeaking ? "animate-pulse" : ""
              }`}
            ></div>
            <div
              className={`absolute w-1/2 h-1/2 rounded-full bg-white transition-transform duration-100 ${
                isSpeaking ? "scale-110" : "scale-100"
              }`}
            ></div>
          </div>
        </div>

        {/* Sound wave bars */}
        {isSpeaking && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.6s",
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Status text */}
      <div className="text-center text-white z-10 mb-4">
        <p className="text-lg font-semibold mb-1">
          {isSpeaking
            ? "Speaking..."
            : text
            ? "Ready"
            : "Waiting for response..."}
        </p>
        {isSpeaking && (
          <div className="flex justify-center space-x-1">
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex space-x-3 z-10">
        <button
          onClick={handleManualSpeak}
          disabled={!text}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            text
              ? "bg-white text-indigo-600 hover:bg-opacity-90 active:scale-95"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isSpeaking ? "Stop" : "Speak"}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Text preview (optional, for debugging) */}
      {text && (
        <div className="mt-4 max-w-sm text-center">
          <p className="text-xs text-white/70 line-clamp-3">{text}</p>
        </div>
      )}
    </div>
  );
};

export default AITextToSpeech;
