import React, { useRef, useEffect, useContext } from 'react'

import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

interface ITransitionContextProps {
  parent: {
    show: boolean
    isInitialRender: boolean
    appear?: boolean
  }
}

interface ICSSTransitionProps {
  show: boolean
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  appear?: boolean
}

const TransitionContext = React.createContext<ITransitionContextProps>({
  parent: {
    show: false,
    isInitialRender: true,
  },
})

const useIsInitialRender = () => {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

const CSSTransition: React.FC<ICSSTransitionProps> = props => {
  const {
    show,
    enter = '',
    enterFrom = '',
    enterTo = '',
    leave = '',
    leaveFrom = '',
    leaveTo = '',
    appear,
    children,
  } = props

  const enterClasses = enter.split(' ').filter(s => s.length)
  const enterFromClasses = enterFrom.split(' ').filter(s => s.length)
  const enterToClasses = enterTo.split(' ').filter(s => s.length)
  const leaveClasses = leave.split(' ').filter(s => s.length)
  const leaveFromClasses = leaveFrom.split(' ').filter(s => s.length)
  const leaveToClasses = leaveTo.split(' ').filter(s => s.length)

  const addClasses = (node: HTMLElement, classes: string[]) => {
    classes.length && node.classList.add(...classes)
  }

  const removeClasses = (node: HTMLElement, classes: string[]) => {
    classes.length && node.classList.remove(...classes)
  }

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      onEnter={(node: HTMLElement) => {
        addClasses(node, [...enterClasses, ...enterFromClasses])
      }}
      onEntering={(node: HTMLElement) => {
        removeClasses(node, enterFromClasses)
        addClasses(node, enterToClasses)
      }}
      onEntered={(node: HTMLElement) => {
        removeClasses(node, [...enterToClasses, ...enterClasses])
      }}
      onExit={node => {
        addClasses(node, [...leaveClasses, ...leaveFromClasses])
      }}
      onExiting={node => {
        removeClasses(node, leaveFromClasses)
        addClasses(node, leaveToClasses)
      }}
      onExited={node => {
        removeClasses(node, [...leaveToClasses, ...leaveClasses])
      }}
    >
      {children}
    </ReactCSSTransition>
  )
}

export const Transition: React.FC<ICSSTransitionProps> = props => {
  const { show, appear, ...rest } = props

  const { parent } = useContext(TransitionContext)
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}
