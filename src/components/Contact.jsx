import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR

  const onSubmit = (data) => {
    setStatus('SENDING');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Mock mode fallback if keys aren't set yet
      setTimeout(() => {
        console.log('Form data mock send:', data);
        setStatus('SUCCESS');
        reset();
      }, 1500);
      return;
    }

    emailjs.send(
      serviceId,
      templateId,
      {
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
        to_name: 'Rahul Bramhankar'
      },
      publicKey
    )
    .then(() => {
      setStatus('SUCCESS');
      reset();
    })
    .catch((err) => {
      console.error(err);
      setStatus('ERROR');
    });
  };

  return (
    <section id="contact" className="py-20 relative bg-surface/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            Contact Me
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="glass rounded-xl p-6 space-y-6 border border-border">
              
              <div className="flex items-center space-x-3.5 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl w-full">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-emerald-400 font-mono font-medium">
                  Active & Available for opportunities
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="flex items-center space-x-3.5 p-3 rounded-lg border border-border/40 hover:border-cyan/30 hover:bg-surface/35 transition-all group"
                >
                  <Mail className="w-5 h-5 text-cyan group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider">Email</h4>
                    <p className="text-sm text-text-secondary font-sans mt-0.5 group-hover:text-cyan transition-colors">
                      {resumeData.personal.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${resumeData.personal.phone}`}
                  className="flex items-center space-x-3.5 p-3 rounded-lg border border-border/40 hover:border-cyan/30 hover:bg-surface/35 transition-all group"
                >
                  <Phone className="w-5 h-5 text-cyan group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider">Phone</h4>
                    <p className="text-sm text-text-secondary font-sans mt-0.5 group-hover:text-cyan transition-colors">
                      {resumeData.personal.phone}
                    </p>
                  </div>
                </a>

                <div
                  className="flex items-center space-x-3.5 p-3 rounded-lg border border-border/40"
                >
                  <MapPin className="w-5 h-5 text-cyan" />
                  <div>
                    <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider">Location</h4>
                    <p className="text-sm text-text-secondary font-sans mt-0.5">
                      {resumeData.personal.location}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="glass rounded-xl p-6 sm:p-8 border border-border">
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono text-text-secondary uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full bg-[#0a111c] border border-border rounded-lg px-4 py-3 text-text-primary text-sm font-sans placeholder-text-muted focus:border-cyan focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-xs font-mono text-red-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name.message}</span>
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono text-text-secondary uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full bg-[#0a111c] border border-border rounded-lg px-4 py-3 text-text-primary text-sm font-sans placeholder-text-muted focus:border-cyan focus:outline-none transition-colors"
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs font-mono text-red-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email.message}</span>
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono text-text-secondary uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    {...register('message', { required: 'Message cannot be empty' })}
                    className="w-full bg-[#0a111c] border border-border rounded-lg px-4 py-3 text-text-primary text-sm font-sans placeholder-text-muted focus:border-cyan focus:outline-none transition-colors resize-none"
                    placeholder="Hi Rahul, let's connect..."
                  />
                  {errors.message && (
                    <span className="text-xs font-mono text-red-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message.message}</span>
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'SENDING'}
                  className={`w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan to-cyan-dim text-bg font-bold font-mono py-3 px-6 rounded-lg hover:shadow-cyan-glow hover:scale-[1.01] active:scale-[0.99] transition-all ${
                    status === 'SENDING' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'SENDING' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting message...</span>
                    </>
                  ) : status === 'SUCCESS' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Feedbacks */}
                {status === 'SUCCESS' && (
                  <p className="text-center font-mono text-xs text-green-neon">
                    Transmission complete. I will respond to your inquiry shortly!
                  </p>
                )}
                {status === 'ERROR' && (
                  <p className="text-center font-mono text-xs text-red-400">
                    Failed to send. Please check credentials or retry later.
                  </p>
                )}

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
